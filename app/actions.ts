"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  applyAct,
  applyLearn,
  beginFindAgain,
  completeFind,
  enterDemo,
  startAct,
} from "@/lib/engine";
import { readState, resetState, writeState } from "@/lib/store";

function refreshAll() {
  revalidatePath("/", "layout");
}

export async function enterDemoAction() {
  const next = enterDemo(resetState());
  writeState(next);
  refreshAll();
  redirect("/find");
}

export async function completeFindAction() {
  const next = completeFind(readState());
  writeState(next);
  refreshAll();
  redirect("/opportunities");
}

export async function openOpportunityAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const next = startAct(readState(), id);
  writeState(next);
  refreshAll();
  redirect(`/opportunities/${id}`);
}

export async function actAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const actionId = String(formData.get("actionId") || "");
  if (!id || !actionId) return;
  const next = applyAct(readState(), id, actionId);
  writeState(next);
  refreshAll();
  redirect(`/learn/${id}`);
}

export async function learnAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const choiceId = String(formData.get("choiceId") || "");
  if (!id || !choiceId) return;
  const next = applyLearn(readState(), id, choiceId);
  writeState(next);
  refreshAll();
  redirect("/loop");
}

export async function findAgainAction() {
  const next = beginFindAgain(readState());
  writeState(next);
  refreshAll();
  redirect("/find");
}

export async function resetDemoAction() {
  resetState();
  refreshAll();
  redirect("/");
}
