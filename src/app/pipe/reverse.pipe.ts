import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  transform(sentence: string): string {
    if (sentence) {
      let converted_sentence = '';
      const num = sentence.length - 1;

      for (let item = num; item >= 0; item--) {

        converted_sentence += sentence[item];

      }

      return converted_sentence

    }
    else {
      return sentence
    }
  }

}
