import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Popover, PopoverTrigger,PopoverContent} from "../ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Button } from "../ui/button";


const Commonform=({formControls,formData,setFormData})=>{
    function renderBasedOnType(controlItem){
        let value=formData[controlItem.name] || '' //control data name and form data should be same 
        let element=null;
        switch(controlItem.componentType){
            
            case 'input':
                element=<Input
                    id={controlItem.name}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    value={value}
                    onChange={(event)=>setFormData({
                        ...formData,
                        [controlItem.name]:event.target.value
                    })}
                />
                break;
            case 'select':
                element=
                <Select onValueChange={(value)=>setFormData({...formData,[controlItem.name]:value})} value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={controlItem.placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                        controlItem.options && controlItem.options.length>0? 
                            controlItem.options.map(option=> (
                            <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                            )):null
                        }
                    </SelectContent>
                </Select>
                break;
            case 'textarea':
                element=<Textarea
                    id={controlItem.id}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    value={value}
                    onChange={(event)=>setFormData({
                        ...formData,
                        [controlItem.name]:event.target.value
                    })}
                />
                break;
            case 'date':
                element=
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                         variant="outline"
                         className={cn("w-[240px] justify-start text-left font-normal",!value && "text-muted-foreground")}>
                            {value ? format(new Date(value),"PPP") : <span>Pick a Date</span>}
                         </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={value ? new Date(value) : undefined}
                            onSelect={(date)=>setFormData({
                                ...formData,
                                [controlItem.name]:new Date(date).toISOString().split("T")[0] 
                            })}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                break;
            default:
                element=<Input
                    id={controlItem.name}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    value={value}
                    onChange={(event)=>setFormData({
                        ...formData,
                        [controlItem.name]:event.target.value
                    })}
                />
                break;
        }
        return element
    }
    return (
        <form>
            <div className="flex flex-col gap-3">
                {
                    formControls && formControls.map((controlItem)=>
                    <div className="grid w-full gap-1.5">
                        {renderBasedOnType(controlItem)}
                    </div>
                    )
                }
            </div>
        </form>
    )
}
export default Commonform