import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "datetime"
})
export class DatetimePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const mValue = moment(value);
    const REFERENCE = moment(new Date());
    const TODAY = REFERENCE.clone().startOf("day");
    const YESTERDAY = REFERENCE.clone()
      .subtract(1, "days")
      .startOf("day");
    const A_WEEK_OLD = REFERENCE.clone()
      .subtract(7, "days")
      .startOf("day");

    if (mValue.isSame(TODAY, "d")) {
      return mValue.format("LT");
    } else if (mValue.isSame(YESTERDAY, "d")) {
      return "Yesterday";
    } else if (mValue.isAfter(A_WEEK_OLD)) {
      return mValue.format("dddd");
    }

    return mValue.format("l");
  }
}
