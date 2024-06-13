import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Task } from '../../../types/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TaskCardComponent {
  public task = input.required<Task>();
  public taskUpdateEvent = output<string>();
  public taskDeleteEvent = output<string>();

  public updateTaskEvent(taskId: string): void {
    this.taskUpdateEvent.emit(taskId);
  }

  public deleteTaskEvent(taskId: string): void {
    this.taskDeleteEvent.emit(taskId);
  }
}
