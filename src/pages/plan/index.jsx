import { getAllPlans, setSelectedPlan } from "@/store/slices/admin/plansSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/router";
const PlanIndex = () => {
  const dispatch = useDispatch();
  const { planList, isLoading, selectedPlan } = useSelector(
    (state) => state.planSlice
  );
  const [openEditModal, setOpenEditModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    dispatch(getAllPlans());
  }, []);

  if (isLoading) {
    return (
      <Box
        w="100%"
        p={4}
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="200px"
      >
        <CircularProgress isIndeterminate value={80} />
      </Box>
    );
  }
  return (
    <div className="my-28">
      <p className="text-2xl text-center font-bold">Subscription Plan</p>
      <p className="text-center text-gray-400 text-sm my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
        reprehenderit!
      </p>
      {planList.length > 0 ? (
        <div className="flex justify-center mt-10 ">
          {planList.map((plan, i) => {
            // let colorLight = "#fffde7";
            // let colorDark = "#f9a825";
            // switch (i) {
            //   case 1:
            //     colorLight = "#ede7f6";
            //     colorDark = "#512da8";
            //     break;
            //   case 2:
            //     colorLight = "#e3f2fd";
            //     colorDark = "#1976d2";
            //     break;

            //   default:
            //     break;
            // }
            return (
              <div
                className="border rounded-xl p-5 bg-[#fafdff] max-w-xs mx-2 w-[300px]"
                key={plan._id}
                // style={{ border: `1px solid ${colorDark}` }}
                style={{
                  boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,

                  border: plan.isDefault
                    ? `1px solid ${plan.colorDark}`
                    : "initial",
                }}
              >
                <div className="flex items-center">
                  <img src={plan.imageUrl} width="40" height="40" alt="title" />
                  <p className="text-2xl text-center font-bold ml-4 capitalize">
                    {plan.title}
                  </p>
                </div>
                <ul className="flex flex-col my-5">
                  <li className="flex items-center my-4 ">
                    {/* <img
                      src="/plan/correct.png"
                      width="20"
                      height="20"
                      alt="title"
                    /> */}
                    {/* <p className="ml-2 ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora, alias.
                    </p> */}
                    {plan.description ? (
                      <HTMLContent html={plan.description} />
                    ) : null}
                  </li>
                  <li className="flex items-center my-4">
                    <img
                      src="/plan/correct.png"
                      width="20"
                      height="20"
                      alt="title"
                    />
                    <p className="ml-2 ">{plan.noOfImages} images</p>
                  </li>
                  <li className="flex items-center my-4">
                    <img
                      src="/plan/correct.png"
                      width="20"
                      height="20"
                      alt="title"
                    />
                    <p className="ml-2 ">Monthly : ${plan.price}</p>
                  </li>
                </ul>

                <div className="flex flex-col items-center">
                  <p
                    className="text-3xl font-bold "
                    style={{ color: plan.colorDark }}
                  >
                    ${plan.price - plan.discount}
                  </p>
                  {plan.discount ? (
                    <p className="my-4">Discount : ${plan.discount}</p>
                  ) : (
                    <br />
                  )}
                  <button
                    className={`rounded px-12 py-2 font-medium hover:font-bold hover:cursor-pointer hover:bg-[${plan.colorDark}]`}
                    style={{
                      backgroundColor: plan.colorLight,
                      color: plan.colorDark,
                      transform: plan.isDefault ? "scale(1.2)" : "initial",
                    }}
                    onClick={() => {
                      dispatch(setSelectedPlan(plan));
                      // sessionStorage.setItem("plan", JSON.stringify(plan));
                      router.push("/plan/purchase");
                    }}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <img
            src="/plan/no-content.png"
            width={"150"}
            height={"200"}
            alt="no-content"
          />
          <p className="text-2xl text-gray-600">No data found!</p>
        </div>
      )}
    </div>
  );
};

export default PlanIndex;
const HTMLContent = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
