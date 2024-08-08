import React from 'react';


type DropdownProps = {
    visibility? : any,
    children?:any
};
const Dropdown: React.FC<DropdownProps> = ({ visibility,children}) => {
    const [visibilityAnimation, setVisibilityAnimation] = React.useState(false);
    const [repeat, setRepeat] = React.useState<any>(null);

    React.useEffect(() => {
        if (visibility) {
            clearTimeout(repeat);
            setRepeat("");
            setVisibilityAnimation(true);
        } else {
            setRepeat(setTimeout(() => {
                setVisibilityAnimation(false);
            }, 400));
        }
    }, [visibility]);

    return (
        <article className={`components-dropdown ${visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}`}>
            { visibilityAnimation && children }
        </article>
    )
};

export default Dropdown;