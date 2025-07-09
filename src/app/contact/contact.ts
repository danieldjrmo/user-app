import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {

  urlImagen= "https://picsum.photos/600/400"

}
