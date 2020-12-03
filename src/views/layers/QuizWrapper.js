import React from 'react'
import '../../fonts/fontIcons.css'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import {ADDRESSES, CLASSIFIERS, COMPANIES, DATE_RANGES, LOADING, REPORT, START, STATUSES} from '../../constants.js'
import Category from '../components/Category.js'
import Loading from '../ui/Loading.js'
import css from './QuizWrapper.module.sass'
import Dates from '../components/Dates.js'
import QuizNavigation from '../components/QuizNavigation.js'
import Report from '../components/Report.js'
import Start from '../components/Start.js'
import Statuses from '../components/Statuses.js'
import {ERROR} from '../../constants'
import ErrorMessage from '../components/ErrorMessage'


class QuizWrapper extends React.Component {
    state = {
        fullScreen: false
    }
    render() {
        const fullScreenBtn = (
            <button onClick={() =>
                this.setState({fullScreen: !this.state.fullScreen})}
                className={css.full_screen_btn}
                key={uniqid()}
                dangerouslySetInnerHTML={{__html: this.state.fullScreen ? '&#xe041;' : '&#xe042;'}}
            >
            </button>
        )

        const navigation = this.props.layer === START || this.props.layer === LOADING
            ? fullScreenBtn
            : <QuizNavigation extraBtn={[fullScreenBtn]}/>

        let layer
        switch (this.props.layer) {
            case START:
                layer = <Start />
                break
            case STATUSES:
                layer = <Statuses />
                break
            case COMPANIES:
                layer = <Category key={uniqid()} alwaysOpenSearch={true} />
                break
            case CLASSIFIERS:
                layer = <Category key={uniqid()} alwaysOpenSearch={true}/>
                break
            case ADDRESSES:
                layer = <Category key={uniqid()} alwaysOpenSearch={false}/>
                break
            case DATE_RANGES:
                layer = <Dates />
                break
            case REPORT:
                layer = <Report />
                break
            case LOADING:
                layer = <Loading />
                break
            case ERROR:
                layer = <ErrorMessage />
                break
            default:
                layer = null
        }

        return (
            <div className={this.state.fullScreen ? css['wrapper-full_screen'] : css.wrapper}>
                {/*<div className={css.container}>*/}
                    {navigation}
                    {layer}
                {/*</div>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    layer: state.navigation.active
})

export default connect(mapStateToProps)(QuizWrapper)