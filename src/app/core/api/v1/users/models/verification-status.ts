/* tslint:disable */
/* eslint-disable */

/**
 * Enum representing various verification statuses: - WAITING_FOR_START: waiting_for_start - STARTED: started - WAITING_FOR_REVIEW: waiting_for_review - WAITING_FOR_RESUBMISSION: waiting_for_resubmission - SUCCESS: flow_finished_success - REJECTED: flow_finished_rejected - ERROR: flow_finished_error
 */
export enum VerificationStatus {
  WaitingForStart = 'waiting_for_start',
  Started = 'started',
  WaitingForReview = 'waiting_for_review',
  WaitingForResubmission = 'waiting_for_resubmission',
  FlowFinishedSuccess = 'flow_finished_success',
  FlowFinishedRejected = 'flow_finished_rejected',
  FlowFinishedError = 'flow_finished_error'
}
