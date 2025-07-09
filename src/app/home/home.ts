import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserServices } from '../user-services';
import { User } from '../app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  constructor(private userServices: UserServices, private cdr: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  isActionEdit = false;

  //idEditUser: number = 0;

  dataSource = new MatTableDataSource<User>();

  ngOnInit(): void {

    this.userServices.getAllUsers().subscribe(data => {
      this.dataSource.data = data;
      this.cdr.detectChanges();
    })
  }


  displayedColumns: string[] = ['id', 'name', 'address', 'phone', 'actions'];
  // Inicializa con un nuevo objeto
  user: User = this.createEmptyUser();

  createEmptyUser(): User {
    return { name: '', address: '', phone: '' };
  }

  public onSubmit(userForm: NgForm) {
    const newUser: User = {
      //id: this.users.length + 1,
      name: this.user.name,
      address: this.user.address,
      phone: this.user.phone
    };

    console.log({ newUser })

    this.userServices.addUser(newUser).subscribe(newForum => {
      this.dataSource.data = [newForum, ...this.dataSource.data];
      //console.log('new add forum' + newForum);
    })


    userForm.resetForm();
    this.user = this.createEmptyUser();

    this.snackBar.open('+ Usuario agregado', 'Cerrar', {
      duration: 3000
    });
  }

  selectUser(user: User) {
    this.user = { ...user };
    //this.idEditUser = id;
    this.isActionEdit = true;

    console.log({ user })
  }

  editUser() {
    if (!this.user.id) return;

    this.userServices.editUser(this.user, this.user.id).subscribe(updatedUser => {

      const index = this.dataSource.data.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.dataSource.data[index] = updatedUser;
        this.dataSource._updateChangeSubscription();
      }

      this.isActionEdit = false;
      this.user = this.createEmptyUser();
    });

    this.snackBar.open(' Usuario modificado', 'Cerrar', {
      duration: 3000
    });
  }

  cancelEditUser() {
    this.isActionEdit = false;
    this.user = this.createEmptyUser();
  }

  deleteUser(idUser: number) {
    this.userServices.deleteUser(idUser).subscribe(newForum => {
      this.dataSource.data = this.dataSource.data.filter(user => user.id !== idUser);
      this.dataSource._updateChangeSubscription();
    })

    this.snackBar.open('🗑 Usuario eliminado', 'Cerrar', {
      duration: 3000
    });
  }
}




