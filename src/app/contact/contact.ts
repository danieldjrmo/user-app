import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage,CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {

  urlImagen = "https://picsum.photos/600/400"

  isLoading = true;

  onImageLoad() {
    this.isLoading = false;
  }

  onImageError() {
    this.isLoading = false;
    console.error('Error al cargar la imagen');
  }

}
