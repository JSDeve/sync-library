import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { Knex } from 'knex';
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { InjectConnection } from "nest-knexjs";

@Injectable()
export class SyncService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private readonly httpService: HttpService) {}

    async findAll() {
        const authors = await this.knex.table('authors');
        return authors;
    }
    async syncAuthors(query: string) {
        const { data } = await firstValueFrom(
            this.httpService.get(`https://openlibrary.org/search/authors.json?q=${query}`).pipe(
                catchError((error: AxiosError) => {
                    throw 'An error happened!';
                })
            )
        )
        const authors = data.docs;
        for(const author of authors) {
            const numericValues = Object.fromEntries(
                Object.entries(author).filter(([_, v]) => typeof v === 'number')
            );
            const existingAuthor = await this.knex.table('authors').where('key', author.key).first();
            if(existingAuthor) {
                if(existingAuthor.version !== author.version) {
                    await this.knex.table('authors').where('key', author.key).update({
                        name: author.name,
                        version: author.version,
                        numeric_values: numericValues
                    })
                }
            } else {
                await this.knex.table('authors').insert({
                    key: author.key,
                    name: author.name,
                    version: author.verison,
                    numeric_values: numericValues
                })
            }
        }

        return authors.length;
    }
}