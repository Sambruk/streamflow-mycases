#
# Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.
#
# The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
# Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
# or distribution is prohibited.
#
rm -rf dist
grunt build
rm -rf dist/api
rm -f dist/mock.html
# TODO remove not needed script since they are replaced by scripts.js
# rm -rf dist/modules/*.js

