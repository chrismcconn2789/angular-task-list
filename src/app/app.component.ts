import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types/task';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CheckIconComponent } from './components/icons/check/check.component';
import { InformationIconComponent } from './components/icons/information/information.component';
import { TrashIconComponent } from './components/icons/trash/trash.component';
import { WarningIconComponent } from './components/icons/warning/warning.component';
import { TaskBadgesComponent } from './components/task-badges/task-badges.component';
import { TaskInputComponent } from './components/task-input/task-input.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    TaskInputComponent,
    TaskBadgesComponent,
    FooterComponent,
    TaskListComponent,
    NgxSonnerToaster,
    InformationIconComponent,
    TrashIconComponent,
    WarningIconComponent,
    CheckIconComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  protected readonly toast = toast;

  public tasks = signal<Task[]>([]);
  public completeTasks = signal<number>(0);
  public incompleteTasks = signal<number>(0);

  private modalTwClasses =
    'w-[400px] bg-[#121217] font-deca text-sm flex gap-2 border-2 px-8 py-4 rounded-md items-center';

  ngOnInit(): void {
    this.getFromLocalStorage();
    this.updateTaskCounts();
  }

  public addTask(taskTitle: string): void {
    if (taskTitle === '') {
      this.toast.warning('Enter a name to add a task', {
        icon: WarningIconComponent,
        duration: 1500,
        class: `${this.modalTwClasses} border-amber-500/20`,
        unstyled: true,
      });
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      item: taskTitle,
      completed: false,
    };

    this.tasks().push(newTask);
    this.saveLocalStorage();
    this.updateTaskCounts();

    this.toast.success('Task Added', {
      description: `${taskTitle} has been added`,
      icon: InformationIconComponent,
      duration: 1500,
      unstyled: true,
      class: `${this.modalTwClasses} border-[#FD33C5]/20`,
    });
  }

  public deleteTask(taskId: string): void {
    const deletedTask = this.tasks().find((task) => task.id === taskId)?.item;
    const taskIndex = this.tasks().findIndex((task) => task.id === taskId);
    this.tasks().splice(taskIndex, 1);
    this.updateTaskCounts();
    if (this.tasks().length === 0) {
      this.removeLocalStorageKey();
    } else {
      this.saveLocalStorage();
    }

    this.toast.error('Task Removed', {
      description: `${deletedTask} has been removed`,
      icon: TrashIconComponent,
      duration: 1500,
      unstyled: true,
      class: `${this.modalTwClasses} border-red-500/20`,
    });
  }

  public updateTask(taskId: string): void {
    this.tasks().map((task) => {
      if (task.id === taskId) {
        return (task.completed = !task.completed);
      } else {
        return task;
      }
    });
    this.saveLocalStorage();
    this.updateTaskCounts();

    if (this.tasks().length === this.completeTasks()) {
      this.toast.success('All tasks completed', {
        icon: CheckIconComponent,
        duration: 1500,
        unstyled: true,
        class: `${this.modalTwClasses} border-green-500/20`,
      });
    }
  }

  private saveLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  private getFromLocalStorage(): void {
    let existingTasks = localStorage.getItem('tasks');
    if (existingTasks?.length) {
      this.tasks.set(JSON.parse(existingTasks));
    }
  }

  private removeLocalStorageKey(): void {
    localStorage.removeItem('tasks');
  }

  private updateTaskCounts(): void {
    this.completeTasks.set(
      this.tasks().filter((task) => task.completed).length
    );
    this.incompleteTasks.set(
      this.tasks().filter((task) => !task.completed).length
    );
  }
}
