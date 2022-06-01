import { Injectable } from '@nestjs/common';
import { Observable, of } from "rxjs";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  shorten(url: string): Observable<string> {
    const hash = Math.random().toString(36).slice(7);
    return of(hash);
  }
}
