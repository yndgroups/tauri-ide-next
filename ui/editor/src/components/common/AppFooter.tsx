import { defineComponent } from "vue";
import { useFileStore } from '@/store';
import { storeToRefs } from 'pinia';
const store = useFileStore();
const { file, fileList } = storeToRefs(store);

export default defineComponent({
    setup() {
        let el = document.createElement('div')
        el.classList.add('test')
        el.appendChild(document.createTextNode('测试'))
        return () => (<div>{{el}}</div>)
        
    }
})