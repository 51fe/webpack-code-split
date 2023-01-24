import Vue from 'vue'
import {
  Button,
  Input,
  Autocomplete,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  TimePicker,
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  MessageBox,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Autocomplete)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)

Vue.prototype.$ELEMENT = { size: 'small'};

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
