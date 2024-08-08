import * as React from 'react';
import functions from '@utils/functions';
import ChoiceScreen from "./choice";
import RegistScreen from "./regist";

export default function Signup() {

  const [step1, setStep1] = React.useState(null);

    if ( !functions.isEmpty(step1)) {
        return (
            <RegistScreen
            />
        )
    }
    return (
        <ChoiceScreen
            onDateChange={setStep1}
        />
    )
}