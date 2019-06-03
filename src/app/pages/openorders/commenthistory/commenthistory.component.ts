import { Component, OnInit                                              } from '@angular/core';
import { FilterService                                                  } from '../filter/filter.service';
import { OpenOrderCommentInterface, OpenOrderInterface                  } from 'app/shared/sdk/models'                       ;
import { PlanerNrToADID, PlanerNrToADIDInterface		                } from 'app/shared/sdk/models'                       ;
import { OpenOrderApi, OpenOrderCommentApi, PlanerNrToADIDApi			} from 'app/shared/sdk/services'                     ;
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended';

@Component({
  selector: 'commenthistory',
  templateUrl: './commenthistory.component.html',
  styleUrls: ['./commenthistory.component.scss']
})
export class CommenthistoryComponent implements OnInit {

    sName                   : string        = 'CommentHistory.Component';
	comments 				: OpenOrderCommentInterface[] = [];
	isCommentHistoryLoading : boolean		= true;

    constructor(
        private filterService		: FilterService,
        private log                 : LoggerServiceExtended,
		private commentApi			: OpenOrderCommentApi,
    ) {

    }

    ngOnInit() {
        this.log.inform(this.sName, 'Hello from CommentHistory', '');
        this.log.inform(this.sName, 'PDDOCO', this.filterService.commentHitoryPDDOCO );
        this.log.inform(this.sName, 'PDLNID', this.filterService.commentHitoryPDLNID );


		let   filters: any = { where: { and: [] }, order: 'created desc' };

		filters.where.and.push( { pddoco: { eq: this.filterService.commentHitoryPDDOCO.toString() }} );
		filters.where.and.push( { pdlnid: { eq: this.filterService.commentHitoryPDLNID.toString() }} );

		this.commentApi.find( filters )
			.subscribe( (comments: OpenOrderCommentInterface[]) => {
				this.log.inform(this.sName, 'comments', comments);
				this.comments = comments;
				this.isCommentHistoryLoading = false;
			})
    }

	close(){

	}
}
