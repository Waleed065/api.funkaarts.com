import { Response } from "express";

export const Then = (res: Response) => {
  return (result: any) => {
    return res.status(200).json({
      success: true,
      message: "Success",
      result: result ?? [],
    });
  };
};

export const Catch = (res: Response) => {
  return (err: any) =>
    res.status(400).json({
      success: false,
      message: err,
      result: [],
    });
};

export const NotFound = (res: Response) => {
  return (result: any) =>
    res.status(400).json({
      success: false,
      message: "Unable to get any results",
      result: result ?? [],
    });
};
