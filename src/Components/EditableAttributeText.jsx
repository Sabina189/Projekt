/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import { TextInput } from './TextInput'
import { CreateAsyncQueryValidator } from "../Store"

/**
 * shared module.
 * @module shared/components
 */

const validator = CreateAsyncQueryValidator({error: "Něco se nepovedlo", success: "Změna uložena"})

/**
 * @function
 * @param {Object} props.item item which text attribute is edited
 * @param {String} props.attributeName name of the attribute 
 * @param {function} props.asyncUpdater async function which represents an async action for dispatch
 * @returns JSX.Element
 */
export const EditableAttributeText = ({item, attributeName, asyncUpdater, label}) => {
    const dispatch = useDispatch()
    const attributeValue = item[attributeName]
    const [onResolve, onReject] = validator(dispatch)
    const onChange_ = (value) => {
        const newItem = {...item}
        newItem[attributeName] = value
        const action = asyncUpdater(newItem)
        // console.log("EditableAttributeText.action", action)
        dispatch(action).then(onResolve, onReject)
    }
    return (
        // <EditableText id={item.id} value={attributeValue} onChange={onChange_} />
        // <TextInput id={item.id} value={attributeValue} onChange={onChange_} />

        <div className="form-floating">
            <TextInput id={item.id} value={attributeValue} onChange={onChange_} />
            <label htmlFor={item.id}>{label}</label>
        </div>

    )
}