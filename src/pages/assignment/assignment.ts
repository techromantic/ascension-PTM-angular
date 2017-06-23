import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Assignment } from '../../app/assignment';
import { AssignmentService } from '../../app/assignment.service';
import { OnInit } from '@angular/core';
/**
 * Generated class for the AssignmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-assignment',
  templateUrl: 'assignment.html',
  providers: [AssignmentService]
})
export class AssignmentPage {


  ngOnInit(): void{
    this.getAssignments();
  }


  ASSIGNMENTS: Assignment[];
  selectedAssignment: Assignment;

  constructor(public navCtrl: NavController, public navParams: NavParams, private assignmentService: AssignmentService) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentPage');
  }

  onSelect(assignment){
    this.selectedAssignment = assignment;
  }

  getAssignments(): void {
    this.ASSIGNMENTS = this.assignmentService.getAssignments();
  }

}
