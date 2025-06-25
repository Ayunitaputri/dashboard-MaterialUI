import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { getAllData, deleteData } from "@/service/Data.service";
import toast, { Toaster } from "react-hot-toast";

export function Home() {
  const [getData, setGetData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);
  // const handleDeleteBox = () => setOpen(!open);

  const handleCreate = () => {
    const payload = {
      user: "",
      email: "",
      description: "",
    };
    try {
      createData(payload);
    } catch (error) {}
  };

  const handleDelete = (id) => {
    setLoading(true);
    try {
      deleteData(id);
      setGetData(getData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to handleDelete:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () =>
      getAllData((data) => {
        setGetData(data.data);
      }),
    [],
  );
  return (
    <>
      <div className="mb-8 mt-12 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-8 flex justify-between p-6"
          >
            <Typography variant="h6" color="white">
              Email Table
            </Typography>
            <Button onClick={handleOpen} color="green" className="">
              CREATE
            </Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogBody>
                {/* MODAL HEADER */}
                <div className="my-2">
                  <Button className="my-2 w-1/3" color="green">
                    CREATE
                  </Button>
                </div>
                <form>
                  {/* MODAL FORM SECTION */}
                  <div className="w-2/4">
                    <div className="grid grid-cols-2">
                      <div className="mb-2 flex flex-row items-center">
                        <Typography className="mx-2 font-semibold">
                          Email
                        </Typography>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          className="w-100% !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                          labelProps={{
                            className: "hidden",
                          }}
                          containerProps={{ className: "min-w-[100px]" }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <Typography className="mx-2 font-semibold">
                        Date
                      </Typography>
                      <Input
                        className="w-100% !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                          className: "hidden",
                        }}
                        type="date"
                      />
                    </div>

                    <div className="mt-2 text-center">
                      <Typography className="mx-2 font-semibold">
                        Description
                      </Typography>
                      <Textarea
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                          className: "hidden",
                        }}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                  {/* END FORM SENCTION */}
                </form>
              </DialogBody>

              <DialogFooter>
                {/* <Button className="mx-2" color="red" onClick={handleOpen}>CLOSE</Button> */}
                <Button className="w-1/3">SUBMIT</Button>
              </DialogFooter>
            </Dialog>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Email", "action"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 px-5 py-3 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getData.map(({ _id, body, email }, key) => {
                  const className = `py-3 px-2 ${
                    key === getData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="ml-3 text-xs font-normal text-blue-gray-500">
                              {body || email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={className}>
                        <Button
                          className="mx-2"
                          onClick={() => handleDelete(_id)}
                          color="red"
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner className="h-12 w-12" />
                          ) : (
                            "Delete"
                          )}
                        </Button>

                        <Button
                          onClick={() => handleDelete(_id)}
                          color="blue"
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner className="h-12 w-12" />
                          ) : (
                            "Update"
                          )}
                        </Button>
                      </td>

                      {/* DELETE DIALOG BOX */}
                      {/* <Dialog open={open} handler={handleDeleteBox}>
                    <p>Are You sure want to delete this ?</p>
                    </Dialog> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Home;
