const InputBox = ({
    label,
    name,
    className,
    type,
    pattern,
    obj,
    setObj,
    placeholder,
    required,
    value,
    disabled,
}:{
    label?:string,
    name:string,
    className?:string,
    type:string,
    pattern?:string,
    obj?:object | string,
    setObj?:any,
    placeholder?:string,
    required?:boolean,
    value?:string | number,
    disabled?:boolean,

}) =>{
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (typeof obj === 'string') return setObj(e.target.value)
        else return setObj({...obj, [e.target.name]: e.target.value})
    }
    return(
        <>
            <div className="flex flex-col items-start my-1 mx-2">
                <label htmlFor="day">{label}</label>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        pattern={pattern}
                        className={className ? className :"h-full w-full rounded-md border border-1 bg-transparent py-2 px-4 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"}
                        value={value}
                        disabled={disabled}
                        required={required}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
            </div>
        </>
    );
}

export default InputBox;