import { Component } from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./SpaceComponent";
import { ConfirmModalComponent } from './ConfirmModalComponent';


interface SpacesState {
    spaces: Space[],
    showModal: boolean,
    modalContent: string
}

interface SpacesProps {
    dataService: DataService
}


export class Spaces extends Component<SpacesProps, SpacesState> {

        constructor(props: SpacesProps) {
            super(props)
            this.state = {
                spaces: [],
                showModal: false,
                modalContent: ''
            }
            this.reserveSpace = this.reserveSpace.bind(this);
            this.closeModal = this.closeModal.bind(this);
        }

        async componentDidMount(){
            const spaces = await this.props.dataService.getSpaces();
            this.setState({ spaces })
        }

        private async reserveSpace(spaceId: string){
            const reserverationResult = await this.props.dataService.reserveSpace(spaceId)
            if (reserverationResult) {
                this.setState({
                    showModal: true,
                    modalContent: `You reserved the space with id ${spaceId} and got the reservtion number ${reserverationResult}`
                })
            } else {
                this.setState({
                    showModal: true,
                    modalContent: `You can not reserve the space with spaceId ${spaceId}`
                })
            }
        }

        private renderSpaces(){
            const rows: any[] = []
            for (const space of this.state.spaces) {
                rows.push(
                    <SpaceComponent
                        key={space.spaceId}
                        location={space.location}
                        name={space.name}
                        spaceId={space.spaceId}
                        reserveSpace={this.reserveSpace}
                    />
                )
            }
            return rows
        }

        private closeModal() {
            this.setState({
                showModal: false,
                modalContent: ''
            })
        }

        render() {
            return <div>
                <h2>Welcome to the Spaces page!</h2>
                {this.renderSpaces()}
                <ConfirmModalComponent 
                    close={this.closeModal}
                    content={this.state.modalContent}
                    show={this.state.showModal}
                />
            </div>
        }
}