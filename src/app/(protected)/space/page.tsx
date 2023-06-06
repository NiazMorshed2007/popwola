import { Activity, Pencil, Scroll } from "lucide-react";
import React from "react";
import { Graph } from "./components/Graph";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="pt-5">
      <h1 className="text-2xl font-semibold">
        Create and Publish your first campaign!
      </h1>
      <p className="text-secondary font-light w-6/12 text-sm mt-1">
        Follow the steps below to create your first campaign with no-code editor
        and publish it on your website.
      </p>

      <div className="my-8 px-10 flex relative">
        <div className="steps-gradient absolute top-0 h-[800px] w-px"></div>
        <div className="steps">
          <div className="relative pl-6">
            <div className="absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full">
              <div className="ml-1 mt-1 h-3 w-3 rounded-full border-2 border-secondary"></div>
            </div>
            <div className="rounded-xl p-0.5">
              <div className="rounded-[10px] bg-root">
                <div className="rounded-[10px] bg-gradient-to-r via-green-1 to-green-1 p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="mb-1 text-xl tracking-[-0.16px] text-secondary/70 font-medium">
                      Create a campaign
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-11 font-normal text-secondary/60">
                    Click the "Create Campaign" button to start creating your
                    campaign
                  </p>
                  <p className="text-xs mb-3 text-secondary">
                    You can see all your campaigns in{" "}
                    <Link href={"/space/campaigns"} className="underline">
                      Campaings
                    </Link>{" "}
                  </p>
                  <Link href={"/space/campaigns/create"}>
                    <Button className="mb-6">Create Campaign</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full">
              <div className="ml-1 mt-1 h-3 w-3 rounded-full border-2 border-secondary"></div>
            </div>
            <div className="rounded-xl p-0.5">
              <div className="rounded-[10px] bg-root">
                <div className="rounded-[10px] bg-gradient-to-r via-green-1 to-green-1 p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="mb-1 text-xl tracking-[-0.16px] text-secondary/70 font-medium">
                      Select a template
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-11 font-normal text-secondary/60">
                    Select a template from the Template Library to quick start
                  </p>
                  <p className="text-xs text-secondary">
                    You can see all available templates in{" "}
                    <Link
                      href={"/space/template-library"}
                      className="underline"
                    >
                      Template Library
                    </Link>{" "}
                    page
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full">
              <div className="ml-1 mt-1 h-3 w-3 rounded-full border-2 border-secondary"></div>
            </div>
            <div className="rounded-xl p-0.5">
              <div className="rounded-[10px] bg-root">
                <div className="rounded-[10px] bg-gradient-to-r via-green-1 to-green-1 p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="mb-1 text-xl tracking-[-0.16px] text-secondary/70 font-medium">
                      Edit on no-code editor
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-11 font-normal text-secondary/60">
                    Use our powerful no-code editor to edit your campaign popup
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full">
              <div className="ml-1 mt-1 h-3 w-3 rounded-full border-2 border-secondary"></div>
            </div>
            <div className="rounded-xl p-0.5">
              <div className="rounded-[10px] bg-root">
                <div className="rounded-[10px] bg-gradient-to-r via-green-1 to-green-1 p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="mb-1 text-xl tracking-[-0.16px] text-secondary/70 font-medium">
                      Add the following script in your website
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-11 font-normal text-secondary/60">
                    Quickly publish your campaign on your website
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full">
              <div className="ml-1 mt-1 h-3 w-3 rounded-full border-2 border-secondary"></div>
            </div>
            <div className="rounded-xl p-0.5">
              <div className="rounded-[10px] bg-root">
                <div className="rounded-[10px] bg-gradient-to-r via-green-1 to-green-1 p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="mb-1 text-xl tracking-[-0.16px] text-secondary/70 font-medium">
                      Click Publish button on Editor
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-11 font-normal text-secondary/60">
                    Quickly publish your campaign on your website
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h1 className="text-3xl font-semibold">Welcome Back, John!</h1>
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
      </div> */}
    </div>
  );
};

export default Dashboard;
