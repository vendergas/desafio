import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientRegistrationAndManagementService } from '../services/client-registration-and-management/client-registration-and-management.service';

@Component({
  selector: 'app-client-registration-and-management',
  standalone: true,
  imports: [],
  templateUrl: './client-registration-and-management.component.html',
  styleUrl: './client-registration-and-management.component.scss'
})
export class ClientRegistrationAndManagementComponent {
  client: FormGroup;
  clienties = [];
  submitted: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(private formBuilder: FormBuilder, private clientRegistrationAndManagementService: ClientRegistrationAndManagementService){
    this.client = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telephone: ["", Validators.required],
      company: ["", Validators.required]
    });
  }

  ngOnInit(){
    this.showClienties();
  }

  get formControls(){
    return this.client.controls;
  }

  showClienties(){
    this.clientRegistrationAndManagementService.getAll().subscribe((data) => this.clienties = data);
  }

  onSubmit(){
    this.submitted = true;

    if(this.client.value.id){
      this.clientRegistrationAndManagementService.edit(this.client.value).subscribe(() => {
        this.showClienties();
        this.resetForm();
      });
    } else{
      this.clientRegistrationAndManagementService.register(this.client).subscribe(() => {
        this.showClienties();
        this.resetForm();
      });
    }
  }

  onEdit(clientForm: FormGroup){
    this.client.setValue(clientForm);
  }

  edit(id: string){
    this.clientRegistrationAndManagementService.edit(id);
  }

  delet(id: string){
    this.clientRegistrationAndManagementService.deleteClient(id);
  }

  resetForm(){
    this.client.reset({id: null, name: "", email: "", telephone: "", company: ""});
  }
}
