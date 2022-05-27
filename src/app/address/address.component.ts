import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { getAddressToFromCep } from 'src/services/address_services';

interface IAddress {
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  ddd?: string;
  gia?: string;
  ibge?: string;
  siafi?: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  public cep: string;
  public address: null | IAddress;
  public errorMessage: string;

  constructor() {
    this.cep = '';
    this.address = null;
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  findAddress() {
    (async () => {
      try {
        const address = (await getAddressToFromCep(this.cep)) as IAddress;
        this.address = address as IAddress;
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    })();
  }

  resetValues() {
    this.cep = '';
    this.address = null;
  }
}
