import { Component, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-task-input",
  templateUrl: "./task-input.component.html",
  styleUrls: ["./task-input.component.css"],
  standalone: true,
  imports: [FormsModule],
})
export class TaskInputComponent {
  taskTitle = signal<string>("");
  taskTitleEvent = output<string>();

  public addTask(task: string): void {
    this.taskTitleEvent.emit(task);
    this.taskTitle.set("");
  }
}
