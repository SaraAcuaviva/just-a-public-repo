import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myInsertTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'PRUEBA FRONT END';
  label = 'Para comenzar, seleccione su archivo';
  rawText: string;

  readFile(event) {
    if (event.target.files.length > 0) {    //verify if some file was chosen
      let input = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        var text = reader.result;
        this.rawText = text.toString();
      }
      reader.readAsText(input);
    }
  }
}
