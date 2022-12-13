import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons : Person[] = [];

  selectedPerson: Person = new Person();

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPersons()
  }

  resetFrom(form: NgForm){
    if (form){
      form.reset()
    }
  }

  addPerson(form: NgForm){
    if (form.value._id) {
      //patch
      this.personService.patchPerson(form.value)
      .subscribe( res => {
        this.resetFrom(form)
      })
    }else {
      //create
      this.personService.postPerson(form.value)
      .subscribe(res => {
        this.resetFrom(form)
      })
    }
    this.personService.postPerson(form.value)
    .subscribe( res => {
      this.resetFrom(form)
    })
    this.getPersons()
  }

  getPersons() {
    this.personService.getPersons()
    .subscribe(res => {
      this.persons = res as Person[]
    })
  }

  editPerson(person: Person) {
    this.selectedPerson = person
  }

  deletePerson(person: Person) {
    if (confirm('Realmente quiere borrar?')) {
      this.personService.deletePerson(person)
      .subscribe( res => {
        this.getPersons()
      })
    }
  }
}
