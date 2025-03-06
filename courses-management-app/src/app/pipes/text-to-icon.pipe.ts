import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'textToIcon',
  standalone: true
})
export class TextToIconPipe implements PipeTransform {
  iconsForDescriptions:Array<{desc:string, icon:string}> = [
    {desc: 'add', icon: './add.png'},
    {desc: 'delete', icon: './delete.png'},
    {desc: 'edit', icon: './edit.png'},
  ]
  
  
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const iconPath = this.iconsForDescriptions.find(item => item.desc === value)?.icon;
    return iconPath ? this.sanitizer.bypassSecurityTrustHtml(`<img src="${iconPath}" alt="${value} icon" style="width:27px; height:27px;" />`) : value;
  }


}
