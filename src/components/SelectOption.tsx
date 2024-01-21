type option = {
    label?: number | string;
    value?: number | string;
 };

const SelectOption = ({
    label,
    name,
    className,
    obj,
    setObj,
    options,
    placeholder,
    required,
    value,
    disabled,
}:{
    label?:string,
    name:string,
    className?:string,
    obj?:object,
    setObj?:any,
    options:option[],
    placeholder?:string,
    required?:boolean,
    value?:string | number,
    disabled?:boolean,

}) =>{
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setObj({...obj, [e.target.name]: e.target.value})
    }
    return(
        <>
            <div className="flex flex-col items-start my-1 mx-2">
                <label htmlFor="day">{label}</label>
                    <select
                        id={name}
                        name={name}
                        className={className ? className :"h-full w-full rounded-md border border-1 bg-transparent py-2 px-4 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"}
                        value={value == "" ? placeholder: value}
                        defaultValue={placeholder}
                        disabled={disabled}
                        required={required}
                        onChange={handleChange}
                    >
                        <option disabled>{placeholder}</option>
                    {options.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>
                        {item.label}
                        </option>
                    );
                    })}
                </select>
            </div>
        </>
    );
}

export default SelectOption;