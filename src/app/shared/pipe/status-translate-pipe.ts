import {Pipe, PipeTransform} from '@angular/core';
import {VerificationStatus} from "../../core/api/v1/users/models";

@Pipe({
    name: 'statusTranslate'
})
export class StatusTranslatePipe implements PipeTransform {
    private statusMap = {
        [VerificationStatus.WaitingForStart]: 'Нажмите для начала верификации',
        [VerificationStatus.Started]: 'Ожидание прохождения верификации',
        [VerificationStatus.WaitingForReview]: 'Верификация на рассмотрении',
        [VerificationStatus.WaitingForResubmission]: 'Пройдите верификацию повторно',
        [VerificationStatus.FlowFinishedSuccess]: 'Верификация пройдена',
        [VerificationStatus.FlowFinishedRejected]: 'Верификация отклонена',
        [VerificationStatus.FlowFinishedError]: 'Ошибка верификации'
    };

    transform(status: VerificationStatus): string {
        return this.statusMap[status] || status;
    }
}
