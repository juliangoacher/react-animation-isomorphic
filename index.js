/*
 * Copyright 2019 NearForm Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import withStyles from 'isomorphic-style-loader/withStyles'

import keyframes from './react-animation/src/theme/keyframes.css'
import * as Base from './react-animation/src/index'

const AnimateOnChange = withStyles(keyframes)(Base.AnimateOnChange)

const HideUntilLoaded = withStyles(keyframes)(Base.HideUntilLoaded)

const { animations, easings } = Base

export { AnimateOnChange, HideUntilLoaded, animations, easings }

// ---

function setToString( set ) {
    return Array.from(set.values()).reduce( ( s, v ) => s += v, '' )
}

import React from 'react'
//import PropTypes from 'prop-types'
import StyleContext from 'isomorphic-style-loader/StyleContext'

function IsomorphicCSSWrapper( Component, ...styles ) {

    const ComponentWithStyles = withStyles.apply( this, styles )( Component )

    class CSSWrapper extends React.Component {

        getStyleContext() {
            const { props: { css } } = this
            const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
            return { insertCss }
        }

        render() {
            const { props } = this
            const { css } = props
            return (
                <StyleContext.Provider value={this.getStyleContext()}>
                    <Component {...props} />
                    <style
                        className="_isl-styles"
                        dangerouslySetInnerHTML={{ __html: setToString(css) }}
                    />
                </StyleContext.Provider>
            )
        }
    }

    CSSWrapper.defaultProps = {
        css: new Set()
    }
/*
    CSSWrapper.childContextTypes = {
        insertCss: PropTypes.func
    }
*/  
    CSSWrapper.displayName = `(${Component.displayName||Component.name||'Anonymous'}CSSWrapper)`

    return CSSWrapper 
}

export { IsomorphicCSSWrapper }
