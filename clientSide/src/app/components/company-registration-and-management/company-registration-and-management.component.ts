import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyRegistrationAndManagementService } from '../services/company-registration-and-management/company-registration-and-management.service';

@Component({
  selector: 'app-company-registration-and-management',
  standalone: true,
  imports: [],
  templateUrl: './company-registration-and-management.component.html',
  styleUrl: './company-registration-and-management.component.scss'
})
export class CompanyRegistrationAndManagementComponent {
  company: FormGroup;
  companies = [];
  submitted: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(private formBuilder: FormBuilder, private companyRegistrationAndManagementService: CompanyRegistrationAndManagementService){
    this.company = this.formBuilder.group({
      id: [null],
      fantasyName: ["", Validators.required],
      corporateReason: ["", Validators.required],
      cnpj: ["", Validators.required]
    });
  }

  ngOnInit(){
    this.showcompanys();
  }

  get formControls(){
    return this.company.controls;
  }

  showcompanys(){
    this.companyRegistrationAndManagementService.getAll().subscribe((data) => this.companies = data);
  }

  onSubmit(){
    this.submitted = true;

    if(this.company.value.id){
      this.companyRegistrationAndManagementService.edit(this.company.value).subscribe(() => {
        this.showcompanys();
        this.resetForm();
      });
    } else{
      this.companyRegistrationAndManagementService.register(this.company).subscribe(() => {
        this.showcompanys();
        this.resetForm();
      });
    }
  }

  onEdit(companyForm: FormGroup){
    this.company.setValue(companyForm);
  }

  edit(id: string){
    this.companyRegistrationAndManagementService.edit(id);
  }

  delete(id: string){
    this.companyRegistrationAndManagementService.deleteCompany(id);
  }

  resetForm(){
    this.company.reset({id: null, fantasyName: "", corporateReason: "", cnpj: ""});
  }
}
