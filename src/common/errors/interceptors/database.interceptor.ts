import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { isPrimaError } from "../utils/is-prima-error.util";
import { handleDatabaseErrors } from "../utils/handle-database-errors.util";
import { DatabaseError } from "../types/DatabaseError";

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>):
    Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrimaError(error)) {
          error = handleDatabaseErrors(error)
        }
        if (error instanceof DatabaseError) {
          throw new BadRequestException(error.message)
        } else
          throw error
      })
    )
  }
}