import { VersionablePageErrors } from './VersionablePageErrors';
import { VersionablePageErrorMessages } from './VersionablePageErrorMessages';

function generateElementsListFromErrors(errors: Set<VersionablePageErrors>) {
  const elements: string[] = [];
  errors.forEach((error) =>
    elements.push(VersionablePageErrorMessages.get(error))
  );
  return elements;
}

export { generateElementsListFromErrors };
