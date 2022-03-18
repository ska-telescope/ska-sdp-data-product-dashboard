## The following should be standard includes
# include core makefile targets for release management
-include .make/base.mk

-include .make/docs.mk

# include your own private variables for custom deployment configuration
-include PrivateRules.mak
