import { Location } from '@angular/common';

import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // standalone: true,
  // imports: [NgbDatepickerModule],
})
export class ModalComponent implements OnInit {
  idClient!: string | null;

  @Input() title: string = '';
  @Input() id: string = '';
  closeResult = '';
  @Input() modalCall: number = 0;
  @ViewChild('content') content: TemplateRef<any> | null = null;
  @Input() showButtonFone: boolean = false;
  @Input() showButtonDelete: boolean = false;

  constructor(
    private modalService: NgbModal,
    private location: Location,
    private toastr: ToastrService,
    private service: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idClient = this.activatedRoute.snapshot.paramMap.get('id');
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['modalCall'].firstChange) {
      this.open(this.content);
    }
  }

  handleDeleteClient() {
    this.service.deleteClient(this.idClient ?? '').subscribe({
      next: () => {
        this.toastr.success('', 'Deletado com sucesso 🎊');
        this.modalService.dismissAll();
        this.location.back();
      },
      error: (error) => this.toastr.error('', error?.response?.data?.message),
    });
  }
}
