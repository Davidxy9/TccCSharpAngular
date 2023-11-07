import Utils from 'src/app/utils';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent implements OnInit {
  progress: number = 0;
  isSending: boolean = false;
  @Input() fieldValues: any = {};
  @Output() setValue = new EventEmitter();
  baseUrlImage: string = `${environment.apiUrl}/avatar`;
  urlImage: string = `${this.baseUrlImage}/${this.fieldValues.avatar}`;
  styleInputProgress = { width: `${this.progress}%` };
  @Input() overwriteStyle?: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.urlImage = `${this.baseUrlImage}/${this.fieldValues.avatar}`;
  }

  clearAvatar() {
    this.setValue.emit({
      ...this.fieldValues,
      ['avatar']: '',
    });
  }

  handleImageUpload = (event: any) => {
    if (!event.target.files?.length) return;

    this.progress = 0;
    this.isSending = true;

    const formData = new FormData();
    formData.append(event.target.name, event.target.files[0]);

    const old_avatar_file = localStorage.getItem('nameAvatar');

    this.http
      .post(
        `${environment.apiUrl}/client/avatar/?old_avatar_file=${old_avatar_file}`,
        formData
      )
      .subscribe({
        next: (data) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.setValue.emit({
              ...this.fieldValues,
              avatar: data,
            });

            Utils.setValue({
              key: 'nameAvatar',
              value: data,
            });
            this.urlImage = `${this.baseUrlImage}/${data}`;
            this.isSending = false;
            this.progress = 0;
          }
        },
        error: (error) => {
          if (error.status === 201) {
            const data = error?.error?.text;
            this.urlImage = `${this.baseUrlImage}/${data}`;

            this.setValue.emit({
              ...this.fieldValues,
              avatar: data,
            });

            Utils.setValue({
              key: 'nameAvatar',
              value: data,
            });
          }

          this.isSending = false;
          this.progress = 0;
        },
      });
  };
}
