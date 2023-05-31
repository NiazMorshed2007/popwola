import { Activity, Pencil, Scroll } from "lucide-react";
import React from "react";
import { Graph } from "./components/Graph";

const Dashboard = () => {
  return (
    <div className="pt-5">
      <h1 className="text-3xl font-semibold">Welcome Back, John!</h1>
      <p className="text-secondary font-light w-6/12 text-sm mt-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, quia
        dolor. Aut ut nesciunt alias consequuntur quaerat{" "}
      </p>

      <div className="stats-cards my-7 flex items-center gap-5">
        <div className="total-campaigns p-6 py-9 w-3/12 flex items-center gap-9 rounded-xl bg-foreground">
          <Scroll size={44} />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-primary/60">Total Campaigns</span>
            <span className="text-3xl font-semibold">12</span>
          </div>
        </div>

        <div className="total-campaigns p-6 py-9 w-4/12 flex items-center gap-9 rounded-xl bg-foreground">
          <Activity size={44} />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-primary/60">Ongoing Campaigns</span>
            <span className="text-3xl font-semibold">2</span>
          </div>
        </div>

        <div className="total-campaigns p-6 py-9 w-4/12 flex items-center gap-9 rounded-xl bg-foreground">
          <Pencil size={30} />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-primary/60">Drafts Campaign</span>
            <span className="text-3xl font-semibold">2</span>
          </div>
        </div>
      </div>

      <div className="statistics py-10">
        <h1 className="text-xl font-semibold">
          Your active campaigns insights
        </h1>
        <p className="text-secondary font-light w-6/12 text-sm mt-1 mb-10   ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt,
          quia dolor. Aut ut nesciunt alias consequuntur quaerat{" "}
        </p>
        <Graph />
      </div>
    </div>
  );
};

export default Dashboard;
