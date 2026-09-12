import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    imports: [NgFor],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {

  aspires: string[] = ['AI Engineer Role', 'Be part of a long-term team', 'Push Boundaries of Agentic AI'];
  skills: string[] = ['Ai Engineering', 'Full Stack Developemnt', 'System Design', 'Problem Solving', 'Cloud Deployment'];
  hobbies: string[] = ['Reading', 'Excercise', 'Cooking', 'Investing', 'Mindful activities'];
}
