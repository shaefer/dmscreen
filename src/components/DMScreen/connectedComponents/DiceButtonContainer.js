import { connect } from 'react-redux'
import {dmScreenAddResultAction} from '../../../action-creators/DmScreenActionCreators'
import DiceButton from '../DiceButton'

export default connect(state => state, {dmScreenAddResultAction})(DiceButton)