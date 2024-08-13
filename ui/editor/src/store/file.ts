import { defineStore } from 'pinia';
import { File } from '@/types';

export const useFileStore = defineStore({
  id: 'file',
  state: () => ({
    // 打开的文件列表
    fileList: new Array<File>(),
    // 当前激活文件
    file: {} as File,
    // 当前激活索引
    activeKey: 0,
    // 打开的路径地址
    openPath: '',
  }),
  getters: {
    getFileList() {
      return {};
    },
  },
  actions: {
    setFileList(file: File) {
      if (this.file && this.file.path !== file.path) {
        this.file = file;
      }
      // console.log(this.fileList, 'this.fileList');
      if (this.fileList && this.fileList.length > 0) {
        let bool = true;
        this.fileList.forEach((item) => {
          if (item.path == file.path) {
            bool = false;
          }
        });
        if (bool) {
          this.fileList.push(file);
          let len = this.fileList.length - 1;
          this.setActive(len);
        }
      } else {
        this.setActive(0);
        this.fileList.push(file);
      }
    },
    removeFileList(index: number) {
      console.log(index, 'removeFileList');
      let tempIndex = 0;
      if (index > 0) {
        tempIndex = index - 1;
      }
      this.setActive(tempIndex);
      this.file = this.fileList[tempIndex];
      this.fileList.splice(index, 1);
      if (this.fileList.length == 0) {
        this.file = {};
      }
    },
    setActive(activeKey: number) {
      this.activeKey = activeKey;
    },
  },
});

export default (store) => {
  return useFileStore(store);
};
