# React Crop Image

A photo clipping component with upload capability

## Installation

``` bash
npm i react-crop-image --save
```

## Usage

```react
import ReactCropImage from 'react-crop-image'

<ReactCropImage
  src={src}
  title='Edit Image'
  file={file}
  onOk={onOk}
  onCancel={onCancel}
/>
  <input type="file" accept="image/*" onChange={onChange} />
</ReactCropImage>
```

## Props

| Prop       | Type     | Default      | Description                                            |
| ---------- | -------- | ------------ | ------------------------------------------------------ |
| src        | string   | _            | 图片路径必传项                                         |
| title      | string   | 'Edit Image' | 弹窗Title                                              |
| onOk       | function | _            | 点击确定回调，参数为关闭函数，返回裁剪文件数据自动关闭 |
| onCancel   | function | _            | 点击取消回调，关闭弹窗                                 |
| file       | File     | _            | 上传文件                                               |
| modalProps | object   | _            | Props of antd modal                                    |
| cropProps  | object   | _            | Props of React Image Crop                              |

