import Container from "~/components/Container";
import type {MetaFunction} from "@remix-run/node";
import {
  Button,
  Form,
  GetProp, message, Select,
  Typography,
  Upload, UploadFile,
  UploadProps
} from "antd";
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {useState} from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "OptimaPic - Flip/Flop" },
    { name: "description", content: "OptimaPic - Compress, convert, resize and flip your image" },
  ];
};

const { Title } = Typography

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function FlipFlop() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const maxUpload = 10
  // const [uploading, setUploading] = useState(false);
  // const handleUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     // @ts-ignore
  //     formData.append('files[]', file as FileType);
  //   });
  //   setUploading(true);
  //   fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then(async () => {
  //       setFileList([]);
  //       await message.success('upload successfully.');
  //     })
  //     .catch(async () => {
  //       await message.error('upload failed.');
  //     })
  //     .finally(() => {
  //       setUploading(false);
  //     });
  // };

  function handleRemove(file) {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  }

  return (
    <>
      <Container className={'p-5'}>
        <div className={'flex flex-col gap-5'}>
          <div>
            <Title level={2}>Flip/Flop your
              Images</Title>
          </div>
          <div className={'max-w-[50%]'}>
            <Form
              layout={'vertical'}
              form={form}
            >
              <Form.Item label="Pick your Images">
                <div className={'flex flex-col'}>
                  <div className={'flex flex-col mb-5 gap-2'}>
                    { fileList.map((obj, index) =>
                      (
                        <div className={'flex items-center'} key={`uploaded-${index}`}>
                          <div className={'w-[5%] text-start'}>{ index + 1 }</div>
                          <div className={'w-[95%] p-3 rounded-md border border-solid border-b-gray-200 hover:border-blue-400 flex items-center justify-between'}>
                            <div>
                              {obj.name}
                            </div>

                            <div className={'flex items-center gap-5'}>
                              <Select
                                defaultValue="flip"
                                style={{width: 120}}
                                options={[
                                  {value: 'flip', label: 'Flip'},
                                  {value: 'flop', label: 'Flop'},
                                ]}
                              />
                              <div className={'cursor-pointer'}
                                   onClick={() => handleRemove(obj)}>
                                <DeleteOutlined/>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <Upload
                    multiple={true}
                    beforeUpload={async (file) => {
                      if (fileList.length >= 10) {
                        await message.error('Max 10 Image')
                        return false
                      }

                      setFileList([...fileList, file]);
                      return false;
                    }}
                    fileList={fileList}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined/>}>Select File</Button>
                  </Upload>
                </div>
              </Form.Item>
              <Form.Item>
                <Button type="primary">Start Flip/Flop</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>
    </>
  )
}
