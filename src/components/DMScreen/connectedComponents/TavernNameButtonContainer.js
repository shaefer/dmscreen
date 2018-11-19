import { connect } from 'react-redux'
import {dmScreenAddResultAction} from '../../../action-creators/DmScreenActionCreators'
import TavernNameButton from '../TavernNameButton'

export default connect(state => state, {dmScreenAddResultAction})(TavernNameButton)