import { Request, Response, NextFunction } from 'express';
import Constant from '../../constant';
import catchAsync from '../../common/error-handler/CatchAsyncError';
import errors from '../../common/error-handler';
import Parent from './parent.model';
import Child from '../child/child.model';
import Caregiver from '../caregiver/caregiver.model';

const { statusCode } = Constant;
const { BadRequestError } = errors;

class ParentController {
  createParent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { personal, children, caregivers } = req.body;

    // Validate request body
    if (!personal || !children || !caregivers) {
      return next(new BadRequestError('Personal, Children, and Caregivers details are required'));
    }

    // Check if parent already exists
    const existingParent = await Parent.findOne({
      $or: [{ email: personal.email }, { phone_number: personal.phone_number }],
    });

    if (existingParent) {
      return next(new BadRequestError('Parent already exists'));
    }

    // Check if any caregiver already exists
    for (const caregiver of caregivers) {
      const existingCaregiver = await Caregiver.findOne({
        $or: [{ email: caregiver.email }, { phone_number: caregiver.phone_number }],
      });

      if (existingCaregiver) {
        return next(new BadRequestError(`Caregiver with email or phone number (${caregiver.email || caregiver.phone_number}) already exists`));
      }
    }

    // Create Parent
    const parent = new Parent(personal);
    const savedParent = await parent.save();

    // Create Children
    const childrenData = children?.map((child: any) => ({
      ...child,
      parent_id: savedParent._id,
    }));

    if (childrenData && childrenData.length > 0) {
      await Child.insertMany(childrenData);
    }

    // Create Caregivers
    const caregiverData = caregivers?.map((caregiver: any) => ({
      ...caregiver,
      parent_id: savedParent._id,
    }));

    if (caregiverData && caregiverData.length > 0) {
      await Caregiver.insertMany(caregiverData);
    }

    // Respond with success
    res.status(statusCode.CREATED).json({
      message: 'Parent registered successfully',
      data: {},
      status: true,
    });
  });
}

export default new ParentController();
