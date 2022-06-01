# Link Shortener

## Build From Scratch

### Create Nest.js Project
To install Nest.js CLI globally using NPM:

```bash
npm install -g @nestjs/cli
```

Create a directory named `backend` and get into it:

```bash
mkdir -p backend
cd backend
```

Now, create a Nest.js project there:

```bash
nest new link-shortener
```

Then, when asked to pick a package manager, pick `npm` just by pressing enter.

A git repo is created under `link-shortener` with everything included in it.
As we are already inside a git repo, let's remove the `.git` directory in the Nest.js
project and commit the whole project instead.

```bash
cd link-shortener
rm -rf .git
git add .
git commit -m "Create Nest.js project"
```

### Add Shortening Logic

Let's take a look into the `src` directory:

```
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

- `app.controller.ts` is the HTTP controller.
- `app.controller.spec.ts` is where the tests for the controller reside.
- `app.module.ts` is the module definitions (for dependency injection, etc).
- `app.service.ts` is where the service resides.

Some context: The business logic should reside in the service layer,
and the controller in charge of serving the logic to I/O device, namely HTTP.

As we want to create an endpoint that shortens URLs, let's create it in the controller, `app.controller.ts`:

```typescript
import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shorten')
  shorten(@Query('url') url: string): Observable<string> {
    // TODO implement
    return of(undefined);
  }
}
```

Some explanation:
- The function is mapped to the POST requests to the URL `/shorten`,
- The variable `url` is a parameter that we expect is going to be sent with the request,
- The parameter `url` is expected to have the type of `string`,
- The function is async and returns an observable.

To learn more about observables, take a look [RxJS.dev](https://rxjs.dev/).

Now that we have an empty function, let's write a test for it, in `app.controller.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { tap } from "rxjs";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // here
  describe('shorten', () => {
    it('should return a valid string', done => {
      const url = 'aerabi.com';
      appController
        .shorten(url)
        .pipe(tap(hash => expect(hash).toBeTruthy()))
        .subscribe({ complete: done });
    })
  });
});
```

Run the tests to make sure it fails:

```bash
npm test
```

Now, let's create a function in the service layer, `app.service.ts`:

```typescript
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
```

And let's call it in the controller, `app.controller.ts`:

```typescript
import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shorten')
  shorten(@Query('url') url: string): Observable<string> {
    return this.appService.shorten(url);
  }
}
```

Let's run the tests once more:

```bash
npm test
```

A few points to clear here:
- The function `shorten` in the service layer is sync, why did we wrap into an observable? 
  It's because of being future-proof. In the next stages we're going to save the hash into a DB and that's not sync anymore.
- Why does the function `shorten` get an argument but never uses it? Again, for the DB.
