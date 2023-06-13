import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions:any=[]
  searchTerm:string=""
  constructor(private api:ApiService,private transactionRouter:Router){

  }
  ngOnInit(): void {
    
    this.api.allTransactions()
    .subscribe(
      //200
      (result:any)=>{
        console.log(result);
        this.transactions = result.transaction
      },
      //400
      (result:any)=>{
        console.log(result.error);
        
      }
    )
  }

  //genearate pdf
  generatePDF(){
    //1. create an object for jspdf
    var pdf = new jspdf()
    //2. set up title row for the table
    let tHead = ['Type','From Account','To Account','Amount']
    let tBody = []
    //3. set up pdf properties
    pdf.setFontSize(16)
    pdf.setTextColor('red')
    pdf.text('Mini Statement',15,10)
    pdf.setFontSize(12)

    //4. to display as table need to convert array of object to nested array
    for(let item of this.transactions){
      let temp = [item.type,item.fromAcno,item.toAcno,item.amount]
      tBody.push(temp)
    }
    //5. convert nested array to table using autotable
    (pdf as any).autoTable(tHead,tBody,{startY:15})
    //6. to open pdf in another tab
    pdf.output('dataurlnewwindow')
    //7. to download/save pdf
    pdf.save('Ministatement.pdf')
  }
}
